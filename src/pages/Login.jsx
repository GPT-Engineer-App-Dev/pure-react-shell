import { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/index.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  if (session) {
    navigate('/');
    return null;
  }

  return (
    <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Login</Heading>
        <Box width="100%">
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
        </Box>
        <Box width="100%">
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </Box>
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
      </VStack>
    </Container>
  );
};

export default Login;