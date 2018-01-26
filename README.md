# Dev Set Up

    yarn
    tsc -w
    yarn run api (in new terminal tab)

    curl -X "POST" "http://localhost:9229/api/locations/get-closest" \
     -H "Content-Type: application/json" \
     -d $'{"address": "123 Main St, Anywhere, OH"}'


Production endpoint: `https://ctproblem.herokuapp.com/api/locations/get-closest`