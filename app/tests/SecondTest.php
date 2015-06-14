<?php

class SecondTest extends TestCase {

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	
	public function test_invalid_login()
{
    // Make login attempt with invalid credentials
    Request::replace($input = [
        'objSymbol'     => ["vfinx","vigrx","veipx"]
   
    ]);

   /* $this->mock->shouldReceive('logAttempt')
    ->once()
    ->with($input)
    ->andReturn(false);*/

    $test=$this->action('POST', 'assumptions@historicReturns');
    echo $test;
    // Should redirect back to login form with old input
    $this->assertHasOldInput();
    $this->assertRedirectedToAction('assumptions@historicReturns');
}

}
