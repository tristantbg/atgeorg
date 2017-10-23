<header>
	<span id="site-title">
		<h1><?= $site->title()->html() ?></h1>
	</span>
	<?php foreach ($sections as $key => $section): ?>
		<span 
		class="section-title <?= $section->headerPosition() ?> hidden" 
		data-type="<?= $section->intendedTemplate() ?>" 
		data-id="<?= $section->uid() ?>">
			<?php
			$hTitle = $section->headerTitle()->lower();
			$space = '';
			if($section->headerSpace()->bool()) $space = '&nbsp;';
			?>
			<?= e($section->headerPosition() == 'before', $hTitle.$space, $space.$hTitle) ?>
		</span>
	<?php endforeach ?>
	<span id="question-mark" class="section-title after hidden">&nbsp;?</span>
</header>