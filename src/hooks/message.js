export const message = (text) => {
	if (window.note && text) {
		window.note(text)
	}
}