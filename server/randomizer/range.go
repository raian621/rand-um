package randomizer

import "math/rand"

func Range(start int, end int) int {
	return rand.Intn(int(end-start)) + start
}
