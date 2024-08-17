import axios from 'axios';
import Echo from 'laravel-echo';
 
import Pusher from 'pusher-js';
window.Pusher = Pusher;
const apiUrl = import.meta.env.VITE_API_URL
 
window.Echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT,
  wssPort: import.meta.env.VITE_REVERB_PORT,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws', 'wss'],

  authEndpoint: `${apiUrl}/api/broadcasting/auth`,
  authorizer: (channel, options) => {
    return {
        authorize: (socketId, callback) => {
            axios.post(`${apiUrl}/api/broadcasting/auth`, {
                socket_id: socketId,
                channel_name: channel.name
            })
            .then(response => {
                callback(false, response.data);
            })
            .catch(error => {
                callback(true, error.response);
            });
        }
    };
  },
});