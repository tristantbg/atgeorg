<div class="projects-list">

	<?php foreach ($page->categories()->split(',') as $key => $c): ?>
	<div class="projects-category">
		
		<div class="projects-filters">
			<h2><?= $c.' :' ?></h2>
		</div>
		
		<div class="projects-in-category">
		<?php foreach ($page->children()->visible()->filterBy('categories', $c, ',') as $key => $project): ?>

			<?php if($featured = $project->featured()->toFile()): ?>

				<?php 
					$categories = '';
					foreach ($project->categories()->split() as $key => $c){
						$categories .= ' filter-'.tagslug($c);
					}
				?>
				<div class="project-item<?= $categories ?>">
					<a href="<?= $project->url() ?>" data-id="<?= $project->uid() ?>" data-parent="<?= $project->parent()->uid() ?>" data-target="project">
						<img 
						class="lazy lazyload lazypreload" 
						src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 
						data-src="<?= $featured->thumb(array('width' => 600, 'height' => 600, 'crop' => true))->url() ?>" 
						width="100%" 
						alt="<?= $project->title()->html() ?>, <?= $site->title()->html() ?>">
						<div class="project-infos">
							<span class="code"><?= '→'.$project->projectCode().' ' ?></span>
							<span><?= $project->title()->html() ?><span>
							<?php if ($project->startdate()->isNotEmpty()): ?>
								<br><span class="date"><?= ' '.$project->date('Y', 'startdate'); if($project->enddate()->isNotEmpty() && $project->date('Y', 'enddate') != $project->date('Y', 'startdate')) echo ' – '.$project->date('Y', 'enddate') ?></span>
							<?php endif ?>
							<?php if (false && $project->client()->isNotEmpty()): ?>
								<br><span class="client"><?= $project->client()->html() ?></span>
							<?php endif ?>
							<?php if ($project->place()->isNotEmpty()): ?>
								<br><span class="place"><?= '• '.$project->place()->html().' ' ?></span>
							<?php endif ?>
							<span><strong>[voir plus]</strong></span>
						</div>
					</a>
				</div>

			<?php endif ?>

		<?php endforeach ?>
		</div>

	</div>

	<?php endforeach ?>

</div>