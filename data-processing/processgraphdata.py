#!/usr/bin/python

# file to parse data to create graph 

import csv
import re

nodearray = []
sandylinkarray = []
nyclinkarray = []
with open("hurricanesandy.csv", errors="ignore") as datafile:
    csvreader = csv.reader(datafile, delimiter=",")
    linecount = 0
    for row in csvreader:
        if linecount == 0:
            firstrow = row
            linecount += 1
        tweet = row[8].lower()
        nodearray.append({
            "id": row[11],
            "group": 0,
            "label": row[11],
            "level": 0
        })

        if "#sandy" in tweet:
            sandylinkarray.append({
                "target": "sandy",
                "source": row[11],
                "strength": 0.7
            })
        
        if "#nyc" in tweet:
            nyclinkarray.append({
                "target": "nyc",
                "source": row[11],
                "strength": 0.7
            })

print(nyclinkarray)
            
        