import { onMounted, onUnmounted, ref } from "vue";

export function useLocationMap() {
  const Coordenates = ref({latitude: 0, longitude: 0});
  const Support = 'navigator' in window && 'geolocation' in navigator;
  
  let watcher = null;
  onMounted(() => {
    if (Support)
      watcher = navigator.geolocation.watchPosition(
        position => (Coordenates.value = position.coords)
      );
  });
  onUnmounted(() => {
    if (watcher) {
      navigator.geolocation.clearWatch(watcher);
    }
  });

  return {Coordenates, Support};
}


