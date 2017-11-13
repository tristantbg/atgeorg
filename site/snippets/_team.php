<?php foreach ($page->children()->visible() as $key => $people): ?>
	<div class="people">
		<h2><?= $people->title()->lower()->html() ?></h2>
		<div class="people-text">
			<?= $people->text()->kt() ?>
		</div>
		<?php if($avatar = $people->avatar()->toFile()): ?>
			<img 
			class="lazy lazyload avatar" 
			data-src="<?= $avatar->thumb(array('width' => 300, 'height' => 300, 'crop' => true, 'grayscale' => true))->url() ?>" 
			alt="<?= $people->title()->html() ?>, <?= $site->title()->html() ?>">
		<?php endif ?>
	</div>
<?php endforeach ?>