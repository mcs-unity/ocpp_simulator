enum ChargerState {
  available = 'Available',
  preparing = 'Preparing',
  charging = 'charing',
  error = 'error',
}

class Charger {
  state: ChargerState = ChargerState.available;
}

export { Charger, ChargerState };
