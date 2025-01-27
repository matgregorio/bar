import 'package:flutter/material.dart';
import 'package:frontend/services/auth_service.dart';

class PasswordRecoveryScreen extends StatelessWidget{
    final _authService = AuthService();
    final _emailController = TextEditingController();

    void _recoverPassword(BuildContext context) async{
        final email = _emailController.text.trim();
        final response = await _authService.recoverPassword(email);
        if(response['success']){
            ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Email de recuperação enviado!')),
            );
            Navigator.pop(context);
        }else{
            ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Erro: ${response['message']}')),
            );
        }
    }

    @override
    Widget build(BuildContext context){
        return Scaffold(
            appBar: AppBar(title: Text('Recuperação de senha')),
            body: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                    children:[
                        TextField(
                            controller: _emailController,
                            decoration: InputDecoration(labelText: 'Digite seu email'),
                        ),
                        SizedBox(height: 16),
                        ElevatedButton(
                            onPressed: () => _recoverPassword(context),
                            child: Text('Enviar link de recuperação'),
                        ),
                    ],
                ),
            ),
        );
    }
}