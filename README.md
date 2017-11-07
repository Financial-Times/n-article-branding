# n-article-branding [![Circle CI](https://circleci.com/gh/Financial-Times/n-article-branding/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-article-branding/tree/master)

v2 and upwards is based on V3 ES article annotations.

Returns an annotation that  corresponds to the brand according to these rules;

1. Brand, if;
	- has a brand tag

2. Author, if;
	- has an author tag and
	- genre = Comment and
		does not have a brand tag that is not the author

Returned tag is decorated with additional headshot value (it's url) if branding
is columnist and there is a headshot for that columnist (set in next-es-interface).
