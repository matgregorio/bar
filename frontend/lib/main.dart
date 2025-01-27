import 'package:flutter/material.dart';
import 'package:frontend/views/login_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Black Bar',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: LoginScreen(), // Aqui você chama a tela de login
    );
  }
}
