#!/bin/bash

STATUS=0
ls -f src | while read -r dir; do
    if $(test -d src/${dir}) && [[ "$dir" != "." ]] && [[ "$dir" != ".." ]]; then
        matches=$(grep -rn "/"${dir}"/" src | wc -l)
        if [ $matches -gt 0 ]; then
            echo -e "Incorrect usages found ("$matches"):\n"
            grep -rn "/"$dir"/" src
            exit 1
        fi
    fi
done
