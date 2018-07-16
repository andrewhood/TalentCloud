<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWorkSamplesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('work_samples', function(Blueprint $table)
		{
			$table->increments('id');
			$table->text('name')->nullable();
			$table->date('date_created')->nullable();
			$table->integer('file_type_id')->unsigned()->nullable()->index();
			$table->text('url')->nullable();
			$table->text('story')->nullable();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('work_samples');
	}

}
