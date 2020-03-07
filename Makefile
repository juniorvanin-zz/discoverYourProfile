docker-build:
	docker build . -t discover-your-profile

run: 
	docker run -p 8080:80 discover-your-profile