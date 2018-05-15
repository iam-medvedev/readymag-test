import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		blocks: [],
		isAddModalOpened: false
	},
	mutations: {
		/**
		 * Добавление блока
		 * @param payload object Блок
		 */
		addBlock(state, payload) {
			state.blocks.push(payload);
		},

		/**
		 * Открытие/закрытие модалки добавления видео
		 * @param isOpened boolean Открыть/закрыть
		 */
		toggleVideoModal(state, isOpened) {
			state.isAddModalOpened = isOpened;
		}
	},
	actions: {
		/**
		 * Добавление фото
		 * Получаем файл в base64
		 * @param file File Файл
		 */
		addPhoto({commit}, file) {
			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = () => {
				commit('addBlock', {
					type: 'photo',
					thumbnail: reader.result
				});
			};
		}
	}
})