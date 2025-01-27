import 'package:flutter/material.dart';
import 'package:frontend/services/auth_service.dart';
import 'register_screen.dart';
import 'password_recovery_sreeen.dart';
import 'home_screen.dart';

class LoginScreen extends StatelessWidget {
  final _authService = AuthService();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  void _login(BuildContext context) async {
    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();

    final response = await _authService.login(email, password);
    if (response.containsKey('token')) {
      //Navegar para Home ou Register Screen baseado no cargo
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => response['role'] == "adm"
          ? RegisterScreen()
          : HomeScreen(name: response['login']),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(context: Text('Erro: ${response['message']}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _emailController,
              decoration: InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Senha'),
              obscureText: true,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => _login(context),
              child: Text('Entrar'),
            ),
            TextButton(
              onPressed: (){
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => PasswordRecoveryScreen()),
                );
              },
              child: Text('Esqueceu a senha?'),
            ),
          ],
        ),
      ),
    );
  }
}
