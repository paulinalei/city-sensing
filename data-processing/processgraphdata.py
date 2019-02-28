#!/usr/bin/python

# file to parse data to create graph 

import csv
import re

nodearray = []
sandylinkarray = []
nyclinkarray = []
njlinkarray = []
sandypetslinkarray = []
frankenstormlinkarray = []
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

        strength = 0.5
        if linecount % 2 == 0:
            strength = 0.7
        if linecount % 3 == 0:
            strength = 0.8

        if "#sandy" in tweet:
            sandylinkarray.append({
                "target": "sandy",
                "source": row[11],
                "strength": strength
            })
        
        if "#nyc" in tweet:
            nyclinkarray.append({
                "target": "nyc",
                "source": row[11],
                "strength": strength
            })
        
        if "#nj" in tweet:
            njlinkarray.append({
                "target": "nj",
                "source": row[11],
                "strength": strength
            })

        if "#sandypets" in tweet:
            sandypetslinkarray.append({
                "target": "sandypets",
                "source": row[11],
                "strength": strength
            })
        
        if "#frankenstorm" in tweet:
            frankenstormlinkarray.append({
                "target": "frankenstorm",
                "source": row[11],
                "strength": strength
            })

        linecount += 1
print(frankenstormlinkarray)
            
        