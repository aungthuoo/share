# ✅ Flutter Riverpod 2 : The different kinds of providers
## 🔹 1. Provider<T>
Provider is great for accessing dependencies that don't change, such as the `repositories` in our app. 
You may use this to access `a repository`, `a logger`, or some other class that `doesn't contain mutable state`.

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
StateProvider is ideal for storing simple state variables, such as `enums`, `strings`, `booleans`, and `numbers`. 

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
`StateNotifierProvider` is used when you need more `structured`, `controllable`, and `testable` state management — especially for `complex` or `multi-step state` changes.

Example:

```dart
class Todo {
  final int id;
  final String title;
  final bool isCompleted;

  Todo({
    required this.id,
    required this.title,
    this.isCompleted = false,
  });

  // to update the completed status immutably
  Todo copyWith({bool? isCompleted}) {
    return Todo(
      id: id,
      title: title,
      isCompleted: isCompleted ?? this.isCompleted,
    );
  }
}

// TodoNotifier.dart 
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TodoNotifier extends StateNotifier<List<Todo>> {
  TodoNotifier() : super([]);

  void addTodo(String title) {
    final newTodo = Todo(
      id: DateTime.now().millisecondsSinceEpoch,
      title: title,
    );
    state = [...state, newTodo];
  }

  void toggleTodo(int id) {
    state = [
      for (final todo in state)
        if (todo.id == id)
          todo.copyWith(isCompleted: !todo.isCompleted)
        else
          todo
    ];
  }

  void removeTodo(int id) {
    state = state.where((todo) => todo.id != id).toList();
  }
}

final todoProvider = StateNotifierProvider<TodoNotifier, List<Todo>>((ref) {
  return TodoNotifier();
});


// main.dart 
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: TodoPage());
  }
}

class TodoPage extends ConsumerWidget {
  const TodoPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todos = ref.watch(todoProvider); // watch todos
    final todoNotifier = ref.read(todoProvider.notifier); // get notifier

    final controller = TextEditingController();

    return Scaffold(
      appBar: AppBar(title: const Text('Todo List')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: TextField(
              controller: controller,
              decoration: const InputDecoration(labelText: 'New todo'),
              onSubmitted: (value) {
                if (value.isNotEmpty) {
                  todoNotifier.addTodo(value);
                  controller.clear();
                }
              },
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: todos.length,
              itemBuilder: (context, index) {
                final todo = todos[index];
                return ListTile(
                  title: Text(
                    todo.title,
                    style: TextStyle(
                      decoration: todo.isCompleted
                          ? TextDecoration.lineThrough
                          : null,
                    ),
                  ),
                  leading: Checkbox(
                    value: todo.isCompleted,
                    onChanged: (_) {
                      todoNotifier.toggleTodo(todo.id);
                    },
                  ),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete),
                    onPressed: () {
                      todoNotifier.removeTodo(todo.id);
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
```


## 🔹 4. FutureProvider<T>
`FutureProvider` is used when you need `to fetch asynchronous data` — something that returns a Future, like fetching data from a `database`, `API`, or `local storage`.

It listens to a Future and exposes its result to your UI safely, handling the `loading`, `success`, and `error` states for you.

Example:
```dart
// MessageProvider.dart 
import 'package:flutter_riverpod/flutter_riverpod.dart';

// A FutureProvider that simulates fetching a message
final messageProvider = FutureProvider<String>((ref) async {
  await Future.delayed(const Duration(seconds: 2));  // simulate delay
  return "Hello from Riverpod FutureProvider!";
});

// main.dart 
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MessageScreen(),
    );
  }
}

class MessageScreen extends ConsumerWidget {
  const MessageScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final messageAsyncValue = ref.watch(messageProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('FutureProvider Example')),
      body: Center(
        child: messageAsyncValue.when(
          data: (message) => Text(message, style: const TextStyle(fontSize: 20)),
          loading: () => const CircularProgressIndicator(),
          error: (err, stack) => Text('Error: $err'),
        ),
      ),
    );
  }
}
```


## 🔹 5. StreamProvider<T>
Use `StreamProvider` to watch a Stream of results from a `realtime API` and `reactively` `rebuild` the UI.
StreamProvider is a provider designed to expose `stream-based asynchronous data` to your Flutter widgets. 

Example:

```dart 
// StreamProvider.dart 
import 'package:flutter_riverpod/flutter_riverpod.dart';

final counterStreamProvider = StreamProvider<int>((ref) {
  return Stream.periodic(
    const Duration(seconds: 1),
    (count) => count,
  );
});


// main.dart 
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: CounterStreamPage(),
    );
  }
}

class CounterStreamPage extends ConsumerWidget {
  const CounterStreamPage({super.key});
  
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final counterAsyncValue = ref.watch(counterStreamProvider);
    
    return Scaffold(
      appBar: AppBar(title: const Text('Riverpod StreamProvider')),
      body: Center(
        child: counterAsyncValue.when(
          data: (value) => Text(
            'Counter: $value',
            style: const TextStyle(fontSize: 30),
          ),
          loading: () => const CircularProgressIndicator(),
          error: (error, stack) => Text('Error: $error'),
        ),
      ),
    );
  }
}

```

## 🔹 6. NotifierProvider 
This is used when your state is `synchronous` — meaning updates happen instantly, `without waiting` for asynchronous operations like network requests, file I/O, or database calls. State updates are `immediate` and can be controlled with state = assignments.
It combines the simplicity of `StateNotifierProvider` from `Riverpod 1.x` with a cleaner, more scalable pattern.

### (Old Way — Riverpod 1.x / still valid)

```dart
class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);

  void increment() => state++;
}

final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});
```

### (New Way — Riverpod 2.x, recommended)

```dart
class CounterNotifier extends Notifier<int> {
  @override
  int build() => 0;

  void increment() => state++;
}

final counterProvider = NotifierProvider<CounterNotifier, int>(() {
  return CounterNotifier();
});
```

## 🔹 7. AsyncNotifierProvider<TNotifier, TState>
In Riverpod 2, `AsyncNotifierProvider` is a provider `for managing asynchronous state` using a class that extends `AsyncNotifier<T>`.
It’s a modern, declarative way to handle async operations (like `API calls`, `DB queries`, etc.) — replacing patterns that previously involved `FutureProvider` and `StateNotifier`.

```dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// Define an AsyncNotifier
class MessageNotifier extends AsyncNotifier<String> {
  @override
  Future<String> build() async {
    await Future.delayed(const Duration(seconds: 2));  // Simulate network delay
    return "Hello from AsyncNotifier!";
  }
}

// Create a provider for the notifier
final messageProvider = AsyncNotifierProvider<MessageNotifier, String>(() => MessageNotifier());

// Main App
void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MessageScreen(),
    );
  }
}

// Widget to consume the provider
class MessageScreen extends ConsumerWidget {
  const MessageScreen({super.key});
  
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final messageAsync = ref.watch(messageProvider);

    return Scaffold(
      appBar: AppBar(title: const Text("AsyncNotifierProvider Example")),
      body: Center(
        child: messageAsync.when(
          data: (message) => Text(message, style: const TextStyle(fontSize: 24)),
          loading: () => const CircularProgressIndicator(),
          error: (err, stack) => Text("Error: $err"),
        ),
      ),
    );
  }
}
```




## Compare AsyncNotifierProvider and FutureProvider in Flutter Riverpod

Great question! Let's quickly compare AsyncNotifierProvider and FutureProvider in Flutter Riverpod so you can decide which one fits your use case better.

### Use FutureProvider if:
- You are only fetching data once.
- You don’t need internal state or logic.
- You want something lightweight and simple.

```dart
final myDataProvider = FutureProvider<String>((ref) async {
  return await fetchSomething();
});
```
Ideal for one-time HTTP calls, file reads, etc.

### Use AsyncNotifierProvider if:
- You need more control or complex logic inside the provider.
- You want to manage internal state, refresh logic, or expose methods.
- You need fine-grained async logic + mutable state.

```dart
class MyNotifier extends AsyncNotifier<String> {
  @override
  Future<String> build() async {
    return await fetchSomething();
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() => fetchSomething());
  }
}

final myNotifierProvider = AsyncNotifierProvider<MyNotifier, String>(() {
  return MyNotifier();
});
```
Great for user interactions (e.g., `retry buttons`), or when you want methods like `refresh()` or `loadMore()`.





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
