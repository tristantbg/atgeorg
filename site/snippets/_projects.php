<div class="projects-list">

	<?php for ($i=0; $i < 30; $i++): ?>

	<?php foreach ($page->children()->visible() as $key => $project): ?>

		<?php if($featured = $project->featured()->toFile()): ?>

			<div class="project-item">
				<a href="<?= $project->url() ?>" data-target="project">
					<img 
					class="lazy lazyload lazypreload" 
					src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 
					data-src="<?= $featured->thumb(array('width' => 600, 'height' => 600, 'crop' => true))->url() ?>" 
					width="100%" 
					alt="<?= $project->title()->html() ?>, <?= $site->title()->html() ?>">
					<div class="project-infos">
						<span class="code"><?= '→'.$project->projectCode().' ' ?></span>
						<?= $project->text()->kt() ?>
						<?php if ($project->place()->isNotEmpty()): ?>
							<br><span class="place"><?= '• '.$project->place()->html() ?></span>
						<?php endif ?>
						<span><strong>[voir plus]</strong></span>
					</div>
				</a>
			</div>

		<?php endif ?>

	<?php endforeach ?>

	<?php endfor ?>

</div>