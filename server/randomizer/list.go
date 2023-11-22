package randomizer

import "math/rand"

func List(elements []string) string {
	rindex := rand.Intn(len(elements))

	return elements[rindex]
}
