# Cloud vendor local tunnel

Will run a simple test on Windows 11 / Chrome machine to launch a local server.
## Variables
Make sure you add your credentials in file `bin/vars`

## Local Runs  
### Local server start
```shell
docker-compose --file ./docker-compose.test.yml up -d test-server
```

### browserstack 
```shell
$ ./bin/bs.sh
```

### lambdatest
```shell
$ ./bin/lt.sh
```

### hybrid ( both browserstack and lambdatest)
```shell
$ ./bin/hybrid.sh
```

### Local server stop
```shell
docker-compose --file ./docker-compose.test.yml stop
```

## Docker Runs  

***Before running docker make sure that you have killed the local server started for local testing purpose***


### browserstack
Add the entrypoint as `./bin/bs.sh` in `./bin/run.sh`

### lambdatest
Add the entrypoint as `./bin/lt.sh` in `./bin/run.sh`


### hybrid ( both browserstack and lambdatest)
Add the entrypoint as `./bin/hybrid.sh` in `./bin/run.sh`

### To run tests and local server run this command after adding entrypoint
```shell
$ ./bin/run.sh
```
