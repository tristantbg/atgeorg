<nav id="menu">
	<ul>
	<?php foreach ($sections as $key => $section): ?>
		<?php if ($section->intendedTemplate() == "informations"): ?>
			<?php $blocks = $section->children()->visible() ?>
			<li class="parent" data-menuanchor="<?= $section->uid().'-'.$blocks->first()->uid() ?>">
				<a href="<?= '#'.$section->uid().'-'.$blocks->first()->uid() ?>"><?= $section->title()->lower()->html() ?></a>
			</li>
			<?php foreach ($blocks as $key => $block): ?>
				<!-- <li data-menuanchor="<?= $section->uid().'-'.$block->uid() ?>">
					<a href="<?= '#'.$section->uid().'-'.$block->uid() ?>"><?= $block->title()->lower()->html() ?></a>
				</li> -->
			<?php endforeach ?>
		<?php else: ?>
			<li data-menuanchor="<?= $section->uid() ?>">
				<a href="<?= '#'.$section->uid() ?>"><?= $section->title()->lower()->html() ?></a>
			</li>
		<?php endif ?>
	<?php endforeach ?>
	</ul>
</nav>