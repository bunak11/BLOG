import {useEffect} from 'react';
import {useStore,} from 'react-redux';

export const useResetForm = (reset) => {
	const store = useStore();

	useEffect(() => {
		//получаем метод subscribe из хука useStore он будет вызываться каждый раз когда происходят измнения в stste. нам нужно чтобы он реагировал на изменение в wasLogout

		let currentWasLogout = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let previosWasLogaut = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previosWasLogaut) {
				reset();
			}
		});
	}, [reset, store]);

}
