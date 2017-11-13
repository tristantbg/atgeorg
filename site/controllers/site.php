<?php

return function ($site, $pages, $page) {
	$introImage = $site->introImages()->toStructure()->shuffle()->first()->toFile()->width(800)->url();
	$sections = $pages->visible()->filterBy('intendedTemplate', 'in', ['projects', 'default', 'informations', 'news', 'team']);
	$projects = $page->children()->visible();

	return array(
	'introImage' => $introImage,
	'sections' => $sections,
	'projects' => $projects
	);
}

?>
