package randomizer

import (
	"errors"
	"math/rand"
)

func Range(start int, end int) (int, error) {
	if start < 0 || end < 0 || start == end {
		return 0, errors.New("invalid parameters")
	}
	if start > end {
		start, end = end, start
	}
	return rand.Intn(int(end-start)) + start, nil
}
