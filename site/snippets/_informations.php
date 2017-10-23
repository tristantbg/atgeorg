<?php foreach ($page->children()->visible() as $key => $block): ?>
	<div class="informations-section">
		<h2 class="title"><?= $block->title()->lower()->html() ?></h2>
		<?= $block->text()->kt() ?>
	</div>
<?php endforeach ?>