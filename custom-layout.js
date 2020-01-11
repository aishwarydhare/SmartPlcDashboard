var data = {
	clamp: 'Clamp (mm)',
	screw: 'Screw (mm)',
	hy: 'Hyd. Ej (mm)',
	in: 'Inj. Unit (mm)',
	energy: 'Energy (kwh)',
	batch: 'Batch',
	hourly: 'Hourly Pro:',
	rem: 'Rem Mins:',
	mold: 'Mold Cls (sec)',
	injection: 'Injection (sec)',
	refill: 'Refill (sec)',
	cooling: 'Cooling (sec)',
	total: 'Total Cyc (sec)',
	access: 'Access Level: ',
	fla: 'Flag:',
	stag: 'Stage:',
	q: 'Q (%)',
	p: 'P (bar)',
	d: 'D (mm)',
	t: 'T (sec)',
};

function createTileItem(title, value){
	var s = '' +
		// '<div class="row">' +
			'<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2">' +
				'<section class="tile tile-simple">' +
					'<!-- tile widget -->' +
					'<div class="tile-widget">' +
						'<span class="text-lg text-light text-default lt"><strong>'+ title +'</strong></span>' +
					'</div>' +
					'<!-- /tile widget -->' +
					'<!-- tile body -->' +
					'<div class="tile-body">' +
						'<p class="text-uppercase text-elg mb-0">' +
							'<strong class="text-greensea">'+ value +'</strong>' +
						'</p>' +
					'</div>' +
					'<!-- /tile body -->' +
				'</section>' +
			'</div>';
		// '</div>';
	return s;
}

$(document).ready(function() {
	for (var i = 0; i < Object.keys(data).length; i++) {
		var key = Object.keys(data)[i];
		var isReplaceType = false;
		if(data[key].includes('')){
			isReplaceType = true;
		}
		$('#topBarTilesHolder').append(createTileItem(data[key], 123, isReplaceType));
	}

	var totalColumn = 6;
	var totalRow = 5;
	for (var i = 0; i <= totalRow; i++) {
		for (var j = 0; j <= totalColumn; j++) {
			var tableId = '#table'+i+j;
			$(tableId).append('123');
		}
	}

});

