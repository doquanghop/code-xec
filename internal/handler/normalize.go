package handler

import (
	"regexp"
	"strings"
)

func normalizeOutput(output string) string {
	output = strings.TrimSpace(output)
	re := regexp.MustCompile(`\s+`)
	return re.ReplaceAllString(output, " ")
}
