async id => {
	const data = await application.database
		.select('users')
		.where({ id })
		.order('name')
		.projection(['id', 'name', 'city'])

	// if

	// return {}
}
