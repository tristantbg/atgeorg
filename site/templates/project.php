<?php snippet('header') ?>

<div id="page-content" class="project">
	
	<div class="slider">

	<div id="mouse-nav"></div>

	<?php foreach ($images as $key => $image): ?>

		<?php if($image = $image->toFile()): ?>

		<div class="slide" 
		<?php if($image->caption()->isNotEmpty()): ?>
		data-caption="<?= $image->caption()->kt()->escape() ?>"
		<?php endif ?>
		data-media="image"
		>
			<div class="content image">
				<img class="lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-flickity-lazyload="<?= thumb($image, array('height', 1300))->url() ?>" alt="<?= $title.' - © '.$site->title()->html() ?>" height="100%" width="auto" />
				<noscript>
					<img src="<?= thumb($image, array('height', 1300))->url() ?>" alt="<?= $title.' - © '.$site->title()->html() ?>" height="100%" width="auto" />
				</noscript>
			</div>

		</div>
	
		<?php endif ?>

	<?php endforeach ?>

	</div>
	
	<div id="project-description">
		<?= $page->text()->kt() ?>
	</div>

</div>

<?php snippet('footer') ?>