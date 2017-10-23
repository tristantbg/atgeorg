<?php foreach ($page->children()->visible() as $key => $people): ?>
	<div class="people">
		<h2><?= $people->title()->lower()->html() ?></h2>
		<div class="people-text">
			<?= $people->text()->kt() ?>
		</div>
	</div>
<?php endforeach ?>