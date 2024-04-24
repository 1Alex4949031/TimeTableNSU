<template>
  <NavBar/>
  <router-view/>
  <FooterComponent/>
  <div>
    <p>{{ message }}</p>
    <button v-if="!isConnected" @click="connect">Connect</button>
    <button v-if="isConnected" @click="disconnect">Disconnect</button>
  </div>
</template>

<style>
html, body {
  overflow-x: hidden;
}
</style>

<script setup>
import NavBar from "@/components/Nav-Bar.vue";
import FooterComponent from "@/components/Footer-Component.vue";

const {isConnected, message, connect, disconnect} = useWebSocket();

import {ref, onUnmounted} from 'vue';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

function useWebSocket() {
  const isConnected = ref(false);
  const message = ref(null);
  let stompClient = null;

  const connect = () => {
    if (!isConnected.value) {
      const socket = new SockJS('http://localhost:7070/websockets');
      stompClient = Stomp.over(() => socket);
      stompClient.connect({}, () => {
        isConnected.value = true;
        message.value = "Connected";
        stompClient.subscribe('/notifications/newLog', (message) => {
          console.log(message.body);
        });
      });
    }
  }
  const disconnect = () => {
    if (isConnected.value && stompClient) {
      stompClient.disconnect(() => {
        isConnected.value = false;
        console.log("OWN: " + message.value);
      });
    }
  };

  onUnmounted(() => {
    disconnect();
  });

  return {isConnected, message, connect, disconnect};
}

</script>