import 'package:flutter/material.dart';
import 'package:frontend/services/auth_service.dart';

class RegisterScreen extends StatelessWidget{
    final _authService = AuthService();
    final _nameController = TextEditingController();
    final _emailController = TextEditingController();
    final _passwordController = TextEditingController();
    final _roleController = TextEditingController();

    void _register(BuildContext context) async{
        //lógica para registrar o usuário
        final name = _nameController.text.trim();
        final email = _emailController.text.trim();
        final password = _passwordController.text.trim();
        final role = _roleController.text.trim();

        final response = await _authService.register(login, email, password, role);
        if(response.containsKey('token')){
            //Sucesso: Navegar para a tela principal
            Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                    builder: (context) => role == "adm" ? RegisterScreen(): HomeScreen(name:login),
                ),
            );
        }else{
            //Exibir mensagem de erro
            ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(context: Text('Erro: ${response['message']}')),
            );
        }
    }

    Widget build(BuildContext context){
        return Scaffold(
            appBar: AppBar(title: Text('Cadastro de usuário')),
            body: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                    children: [
                        TextField(
                            controller: _nameController,
                            decoration: InputDecoration(labelText: 'Nome'),
                        ),
                        TextField(
                            controller: _emailController,
                            decoration: InputDecoration(labelText: 'Email'),
                        ),
                        TextField(
                            controller: _passwordController,
                            decoration: InputDecoration(labelText: 'Senha'),
                        ),
                        TextField(
                            controller: _roleController,
                            decoration: InputDecoration(labelText: 'Função'),
                        ),
                        SizedBox(height: 16),
                        ElevatedButton(
                            onPressed: () => _register(context),
                            child: Text('Cadastrar'),
                        ),
                    ],
                ),
            ),
        );
    }
}