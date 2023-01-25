import { useState, useEffect } from 'react';
import { Group, Title, TextInput, Container, Button, Stack } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import './App.css';

function App() {
  const [count, setCount] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bet, setBet] = useState(1);
  const [value, setValue] = useState();
  const [currentCard, setCurrentCard] = useState();
  const [totalEarnings, setTotalEarnings] = useState([]);
  const [setMargin500, margin500] = useState();

  const TitleWhite = ({ text, color = 'white' }) => {
    return <Title color={color}>{text}</Title>;
  };

  useEffect(() => {
    if (count < 3) setCurrentCard('d');
    else setCurrentCard('t');
  }, [count]);

  const handleReset = () => {
    setCount(1);
    setBet(1);
    setCurrentCard(1);
    setValue('');
    setTotalEarnings([]);
    setStreak(0);
  };

  const handleSubmit = () => {
    console.log('test');
    if (!value || (value !== 'd' && value !== 't' && value !== 'e')) return setValue('');

    if (value === currentCard) {
      if (bet === 3) setTotalEarnings((prev) => [20000, ...prev]);
      if (bet === 4) setTotalEarnings((prev) => [60000, ...prev]);
      if (bet === 5) setTotalEarnings((prev) => [160000, ...prev]);
      if (bet === 6) setTotalEarnings((prev) => [320000, ...prev]);
      if (bet === 7) setTotalEarnings((prev) => [640000, ...prev]);
      if (bet === 8) setTotalEarnings((prev) => [1600000, ...prev]);
      if (bet === 9) setTotalEarnings((prev) => [3200000, ...prev]);

      setBet((prev) => {
        if (prev < 2) {
          setStreak((prev) => prev + 1);
        } else {
          setStreak(0);
        }

        return 1;
      });
    } else {
      if (value === 'e') {
        if (bet === 3) setTotalEarnings((prev) => [-20000 / 2, ...prev]);
        if (bet === 4) setTotalEarnings((prev) => [-60000 / 2, ...prev]);
        if (bet === 5) setTotalEarnings((prev) => [-160000 / 2, ...prev]);
        if (bet === 6) setTotalEarnings((prev) => [-320000 / 2, ...prev]);
        if (bet === 7) setTotalEarnings((prev) => [-640000 / 2, ...prev]);
        if (bet === 8) setTotalEarnings((prev) => [-1600000 / 2, ...prev]);
        if (bet === 9) setTotalEarnings((prev) => [-3200000 / 2, ...prev]);
      } else {
        if (bet === 3) setTotalEarnings((prev) => [-20000, ...prev]);
        if (bet === 4) setTotalEarnings((prev) => [-60000, ...prev]);
        if (bet === 5) setTotalEarnings((prev) => [-160000, ...prev]);
        if (bet === 6) setTotalEarnings((prev) => [-320000, ...prev]);
        if (bet === 7) setTotalEarnings((prev) => [-640000, ...prev]);
        if (bet === 8) setTotalEarnings((prev) => [-1600000, ...prev]);
        if (bet === 9) setTotalEarnings((prev) => [-3200000, ...prev]);
      }

      setBet((prev) => {
        if (prev !== 3) {
          setStreak((prev) => prev + 1);
        }

        if (prev === 3) {
          setStreak(0);
        }
        if (prev === 9) {
          return prev;
        }
        return prev + 1;
      });
    }

    setCount((prev) => {
      if (prev === 4) return 1;
      if (value === 'e') return prev;
      return prev + 1;
    });
    setValue('');
  };

  return (
    <div className='App'>
      <Container pt={150}>
        <Group position='apart'>
          <TitleWhite text='Dragon and Tiger APP' />
          <TitleWhite text={`Streak ${streak}`} />
          {/* <TitleWhite text={`Total Earnings ${totalEarnings.reduce((a, b) => a + b, 0)}`} /> */}
        </Group>
        <Group mt={30} spacing={100}>
          <TitleWhite text='D' color={count === 1 ? 'orange' : 'white'} />
          <TitleWhite text='D' color={count === 2 ? 'orange' : 'white'} />
          <TitleWhite text='T' color={count === 3 ? 'orange' : 'white'} />
          <TitleWhite text='T' color={count === 4 ? 'orange' : 'white'} />
        </Group>
        <Group my={30}>
          <TitleWhite text='20' color={bet === 1 ? 'orange' : 'white'} />
          <TitleWhite text='60' color={bet === 2 ? 'orange' : 'white'} />
          <TitleWhite text='160' color={bet === 3 ? 'orange' : 'white'} />
          <TitleWhite text='320' color={bet === 4 ? 'orange' : 'white'} />
          <TitleWhite text='640' color={bet === 5 ? 'orange' : 'white'} />
          <TitleWhite text='320' color={bet === 6 ? 'orange' : 'white'} />
          <TitleWhite text='640' color={bet === 7 ? 'orange' : 'white'} />
          <TitleWhite text='1M60' color={bet === 8 ? 'orange' : 'white'} />
          <TitleWhite text='3M200' color={bet === 9 ? 'orange' : 'white'} />
        </Group>
        <TitleWhite text='D => Dragon' />
        <TitleWhite text='T => Tiger' />
        <TitleWhite text='E => Equal' />

        <TextInput
          my={30}
          value={value}
          maxLength={1}
          onChange={(e) => {
            if (e.target.value === 'd' || e.target.value === 't' || e.target.value === 'e') {
              setValue(e.target.value.toLowerCase());
            } else setValue('');
          }}
          onKeyDown={getHotkeyHandler([['Enter', handleSubmit]])}
        />
        <Stack w={300}>
          <Button variant='gradient' gradient={{ from: 'orange', to: 'red' }} onClick={handleSubmit}>
            Enter
          </Button>
          <Button variant='gradient' gradient={{ from: 'orange', to: 'red' }} onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default App;

