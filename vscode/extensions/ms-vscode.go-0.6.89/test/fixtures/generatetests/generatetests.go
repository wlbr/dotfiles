package generatetests

import "fmt"

type obj struct{}

func (o obj) String() string {
	return ""
}

func main() {
	fmt.Println("do nothing")
}
