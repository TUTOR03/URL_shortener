import React from 'react'

export const ConfirmEmailAlert = ()=>{
	return(
		<div className='container mt-3'>
			<div className='row justify-content-center'>
				<div className='col-sm-12'>
					<h2 className='text-uppercase text-center text-main'>
						We sent an activation code on your Email
					</h2>
					<h3 className='text-uppercase text-center text-main'>
						Please confirm your Email in 24 hours to get an access to account
					</h3>
				</div>
			</div>
		</div>
	);
}