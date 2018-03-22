// Copyright 2015 Google Inc. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// Package static demonstrates a static file handler for App Engine flexible environment.
package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"cloud.google.com/go/bigquery"
	"google.golang.org/api/iterator"
	"google.golang.org/appengine"
)

func main() {
	// Serve static files from "static" directory.
	http.HandleFunc("/executeBQ", executeQuery)
	http.Handle("/", http.FileServer(http.Dir("./ui/")))
	appengine.Main()
}

func executeQuery(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	projectID := "utp-md"

	if r.Method != "POST" {
		fmt.Fprint(w, "Only POST requests allowed")
		fmt.Println("Only POST requests")
		w.WriteHeader(403)
	}

	//Read body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		msg := fmt.Sprintf("Could not understand JSON: %v", err)
		fmt.Println(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()
	stmt := string(body)

	// Creates a client.
	client, err := bigquery.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	//Execute Query
	query := client.Query(stmt)
	it, err := query.Read(ctx)

	if err != nil {
		msg := fmt.Sprintf("Could not retrieve columns: %v", err)
		log.Fatal(msg)
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	results := make([]map[string]interface{}, 0)

	//Loop Results
	for {
		var row []bigquery.Value
		err := it.Next(&row)
		if err == iterator.Done {
			break
		}

		if err != nil {
			msg := fmt.Sprintf("Could not retrieve columns: %v", err)
			log.Fatal(msg)
			http.Error(w, msg, http.StatusInternalServerError)
			return
		}

		entry := make(map[string]interface{})
		entry["segmentid"] = row[0]
		entry["weekday"] = row[1]
		entry["hour"] = row[2]
		entry["timezone"] = row[3]
		entry["count"] = row[4]
		entry["average_speed"] = row[5]
		results = append(results, entry)

	}

	fmt.Fprintf(w, "Processing successful \n")

}
