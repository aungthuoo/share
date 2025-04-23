# ✅ Flutter Riverpod 2 Cheat Sheet
## 🔹 1. Provider<T>
Description: Exposes a value that doesn’t change (pure getter or computed).

Example:
```dart
final nameProvider = Provider<String>((ref) => 'Riverpod');

class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final name = ref.watch(nameProvider);
    return Text(name);
  }
}
```



## 🔹 2. StateProvider<T>
Description: A mutable state holder for simple values (like useState in React).

Example:
```dart
final counterProvider = StateProvider<int>((ref) => 0);

class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () => ref.read(counterProvider.notifier).state++,
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

## 🔹 3. StateNotifierProvider<TNotifier, TState>
Description: More complex state management with logic in a StateNotifier.

Example:
```dart
class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  void increment() => state++;
}

final counterNotifierProvider =
    StateNotifierProvider<CounterNotifier, int>((ref) => CounterNotifier());

class MyCounter extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterNotifierProvider);
    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () => ref.read(counterNotifierProvider.notifier).increment(),
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

## 🔹 4. FutureProvider<T>
Description: Asynchronously provides a future value (e.g. from API).

Example:
```dart
final userProvider = FutureProvider<String>((ref) async {
  await Future.delayed(Duration(seconds: 2));
  return 'User Loaded';
});

class UserWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(userProvider);
    return userAsync.when(
      data: (name) => Text(name),
      loading: () => CircularProgressIndicator(),
      error: (err, _) => Text('Error: $err'),
    );
  }
}
```

## 🔹 5. StreamProvider<T>
Description: Provides a stream of values and listens for changes.

Example:
```dart
final timeProvider = StreamProvider<int>((ref) {
  return Stream.periodic(Duration(seconds: 1), (count) => count);
});

class TimerWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final timeAsync = ref.watch(timeProvider);
    return timeAsync.when(
      data: (time) => Text('Time: $time'),
      loading: () => CircularProgressIndicator(),
      error: (err, _) => Text('Error: $err'),
    );
  }
}
```

## 🔹 6. NotifierProvider<TNotifier, TState>
Description: Uses the new Notifier class (replacing StateNotifier) to manage state.

Example:
```dart
class Counter extends Notifier<int> {
  @override
  int build() => 0;

  void increment() => state++;
}

final counterProvider = NotifierProvider<Counter, int>(Counter.new);

class CounterUI extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return ElevatedButton(
      onPressed: () => ref.read(counterProvider.notifier).increment(),
      child: Text('Count: $count'),
    );
  }
}
```

## 🔹 7. AsyncNotifierProvider<TNotifier, TState>
Description: Like Notifier, but supports async initialization.

Example:
```dart
class UserAsyncNotifier extends AsyncNotifier<String> {
  @override
  Future<String> build() async {
    await Future.delayed(Duration(seconds: 1));
    return 'Async User';
  }
}

final userProvider = AsyncNotifierProvider<UserAsyncNotifier, String>(UserAsyncNotifier.new);

class UserUI extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(userProvider);
    return userAsync.when(
      data: (user) => Text('User: $user'),
      loading: () => CircularProgressIndicator(),
      error: (err, _) => Text('Error: $err'),
    );
  }
}
```

## ⚡ Summary Table

| Provider Type           | Use Case                            | State | Async | Mutable |
|-------------------------|-------------------------------------|:-----:|:-----:|:-------:|
| `Provider`              | Read-only value/computation         | ✅    | ❌    | ❌      |
| `StateProvider`         | Simple mutable state                | ✅    | ❌    | ✅      |
| `StateNotifierProvider` | Complex logic with mutable state    | ✅    | ❌    | ✅      |
| `FutureProvider`        | Load async data                     | ✅    | ✅    | ❌      |
| `StreamProvider`        | Listen to data stream               | ✅    | ✅    | ❌      |
| `NotifierProvider`      | Modern state logic (sync)           | ✅    | ❌    | ✅      |
| `AsyncNotifierProvider` | Modern state logic (async)          | ✅    | ✅    | ✅      |



## 🛠 Common Utils

- 📦 `ref.watch()` – Reactive value
- 🏃 `ref.read()` – Non-reactive
- 👂 `ref.listen()` – Observe changes
- 🔄 `ref.refresh()` – Rebuild provider
- 💣 `ref.invalidate()` – Dispose and rebuild


## 🧱 Provider Lifecycle Hooks
```dart
final exampleProvider = Provider((ref) {
  ref.onDispose(() {
    // Cleanup
  });

  ref.onCancel(() {
    // When no one is listening
  });

  ref.onResume(() {
    // When someone starts listening again
  });

  return SomeObject();
});
```

## 🧩 Scoped Providers (overrides)
```dart
final nameProvider = Provider<String>((ref) => 'Default Name');

ProviderScope(
  overrides: [
    nameProvider.overrideWithValue('Andrew'),
  ],
  child: MyApp(),
);
```

## 🔁 Family Modifiers – Parameterized providers
### 🧬 Provider.family
```dart
final greetProvider = Provider.family<String, String>((ref, name) {
  return 'Hello, $name!';
});

ref.watch(greetProvider('Andrew'));
```

### 🧬 FutureProvider.family
```dart
final userProvider = FutureProvider.family<User, int>((ref, userId) async {
  return await fetchUser(userId);
});
```

### 🧬 NotifierProvider.family
```dart
class GreetingNotifier extends Notifier<String> {
  final String name;
  GreetingNotifier(this.name);

  @override
  String build() => 'Hi, $name!';
}

final greetingProvider =
    NotifierProvider.family<GreetingNotifier, String, String>(
        (ref, name) => GreetingNotifier(name));
🧭 Provider Observers (debugging)
```

```dart
class Logger extends ProviderObserver {
  @override
  void didUpdateProvider(ProviderBase provider, Object? previousValue, Object? newValue, ProviderContainer container) {
    print('Provider: ${provider.name ?? provider.runtimeType}, New Value: $newValue');
  }
}

void main() {
  runApp(
    ProviderScope(
      observers: [Logger()],
      child: MyApp(),
    ),
  );
}
```

## 🧠 Best Practices
- Use `NotifierProvider` instead of `StateNotifierProvider` in new projects.

- Keep side-effects (API calls, etc.) outside of UI.

- Compose small providers.

- Use `.family` for parameterized data.