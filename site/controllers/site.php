<?php

return function ($site, $pages, $page) {
	$sections = $pages->visible()->filterBy('intendedTemplate', 'in', ['projects', 'default', 'informations', 'news', 'team']);
	$projects = $page->children()->visible();

	return array(
	'sections' => $sections,
	'projects' => $projects
	);
}

?>
