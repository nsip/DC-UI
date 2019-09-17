package main

import "net/http"
import "fmt"

func main() {
	fmt.Print("Static server started. http://localhost:8002/\n")
	http.ListenAndServe(":8002", http.FileServer(http.Dir("./")))
}
