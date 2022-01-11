
export default {
  state() {
    return {
      userId: null,
      userAccessToken: null
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.userAccessToken;
    },
    isAuthenticated(state){
      return !!state.userAccessToken;
    }
  },
  mutations: {
    setUser(state, payload) {
    state.userAccessToken = payload.token;
    state.userId = payload.userId
    },
  },
  actions: {
    async  login(context, payload){
      const response = await   fetch('http://localhost:3000/login', {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json;charset=UTF-8'
               },
                body: JSON.stringify({
                 email: payload.email,
                 password: payload.password,
             })
         });
         const responseData = await response.json();
         if (!response.ok){
             const error = new Error(responseData.message || "Failed to authenticate.");
             throw error;
         }
         console.log(response);
         context.commit('setUser', {
           token: responseData.accessToken,
           userId: responseData.user.id
         });
     },
   async  signup(context, payload){
     const response = await   fetch('http://localhost:3000/register', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
              },
               body: JSON.stringify({
                firstName: payload.first,
                lastName: payload.last,
                email: payload.email,
                password: payload.pass,
            })
        });
        const responseData = await response.json();
        if (!response.ok){
            const error = new Error(responseData.message || "Failed to authenticate.");
            throw error;
        }
        console.log(response);
        context.commit('setUser', {
          token: responseData.accessToken,
          userId: responseData.user.id
        });
    },
    logout(context){
      context.commit('setUser', {
        token: null,
        userId: null
      })
      
    }
    
  },
};
