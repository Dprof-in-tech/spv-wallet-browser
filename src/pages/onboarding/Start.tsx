import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import gihubIcon from '../../assets/github.svg';
import { Button } from '../../components/Button';
import { Text } from '../../components/Reusable';
import { Show } from '../../components/Show';
import { useBottomMenu } from '../../hooks/useBottomMenu';
import { useTheme } from '../../hooks/useTheme';
import { ColorThemeProps } from '../../theme';
import { storage } from '../../utils/storage';
import yoursLogo from '../../assets/yours-logo.png';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TitleText = styled.h1<ColorThemeProps>`
  font-size: 2rem;
  color: ${({ theme }) => theme.white};
  font-family: 'Inter', Arial, Helvetica, sans-serif;
  font-weight: 700;
  margin: 0.25rem 0;
  text-align: center;
`;

const GithubIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  bottom: 1.5rem;
  margin-top: 1rem;
  cursor: pointer;
`;

const YoursLogo = styled.img`
  width: 5rem;
  height: 5rem;
`;

export const Start = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showStart, setShowStart] = useState(false);
  const { hideMenu, showMenu } = useBottomMenu();

  useEffect(() => {
    hideMenu();

    return () => {
      showMenu();
    };
  }, [hideMenu, showMenu]);

  // If the encrypted keys are present, take the user to the wallet page.
  useEffect(() => {
    storage.get(['encryptedKeys', 'connectRequest'], (result) => {
      if (result?.connectRequest) {
        setShowStart(false);
        navigate('/connect');
        return;
      }

      if (result?.encryptedKeys) {
        setShowStart(false);
        navigate('/bsv-wallet');
        return;
      }
      setShowStart(true);
    });
  }, [navigate]);

  return (
    <Show when={showStart}>
      <Content>
        <YoursLogo src={yoursLogo} />
        <TitleText theme={theme}>Yours Wallet</TitleText>
        <Text theme={theme} style={{ margin: '0.25rem 0 1rem 0' }}>
          An open source project.
        </Text>
        <Button theme={theme} type="primary" label="Create New Wallet" onClick={() => navigate('/create-wallet')} />
        <Button
          theme={theme}
          type="secondary-outline"
          label="Restore Wallet"
          onClick={() => navigate('/restore-wallet')}
        />
        <GithubIcon src={gihubIcon} onClick={() => window.open('https://github.com/yours-org', '_blank')} />
      </Content>
    </Show>
  );
};
