package utils

func GetFileExtension(language string) string {
	switch language {
	case "python":
		return "py"
	case "c":
		return "c"
	case "cpp":
		return "cpp"
	case "java":
		return "java"
	default:
		return "txt"
	}
}
