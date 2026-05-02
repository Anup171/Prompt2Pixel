import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/searchbar';
import ImageCard from '../components/imagecard';
import { GetPosts } from '../api';
import { CircularProgress } from '@mui/material';

const Container = styled.div`
  min-height: calc(100vh - 68px);
  background: ${({ theme }) => theme.bg};
  padding: 64px 44px 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;

  @media (max-width: 768px) {
    padding: 36px 18px 60px;
    gap: 40px;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
  width: 100%;
`;

const Label = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2px;
`;

const Headline = styled.h1`
  font-family: "Syne", sans-serif;
  font-size: clamp(32px, 3.2vw, 80px);
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.05;
  margin: 0;
  letter-spacing: -1.5px;
  white-space: nowrap;
  width: 100%;
  text-align: center;

  @media (max-width: 700px) {
    font-size: clamp(26px, 8vw, 44px);
    letter-spacing: -0.5px;
    white-space: normal;
  }
`;

const Subheadline = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.75;
  margin: 0;
  font-weight: 400;
  max-width: 460px;
`;

const GridWrapper = styled.div`
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitle = styled.div`
  font-family: "Syne", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.2px;
`;

const SectionCount = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 80px 20px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 500;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 80px 0;
`;

const Home = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filtered, setFiltered] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    await GetPosts()
      .then((res) => {
        setLoading(false);
        setPosts(res?.data?.data);
        setFiltered(res?.data?.data);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(posts);
      return;
    }
    const searchText = search.toLowerCase();
    const result = posts.filter(
      (post) =>
        post?.prompt?.toLowerCase().includes(searchText) ||
        post?.name?.toLowerCase().includes(searchText)
    );
    setFiltered(result);
  }, [posts, search]);

  return (
    <Container>
      <HeroSection>
        <Label>Community Gallery</Label>
        <Headline>AI-Generated Images</Headline>
        <Subheadline>
          Browse what others have created, or generate your own from a single sentence.
        </Subheadline>
        <SearchBar search={search} setSearch={setSearch} />
      </HeroSection>

      <GridWrapper>
        {error && <div style={{ color: "red", fontSize: "15px" }}>{error}</div>}
        {loading ? (
          <LoadingWrapper>
            <CircularProgress size={24} style={{ color: "#f97316" }} />
          </LoadingWrapper>
        ) : (
          <>
            <SectionHeader>
              <SectionTitle>Latest creations</SectionTitle>
              {filtered.length > 0 && (
                <SectionCount>{filtered.length} image{filtered.length !== 1 ? "s" : ""}</SectionCount>
              )}
            </SectionHeader>
            <CardWrapper>
              {filtered.length === 0 ? (
                <EmptyState>No images found</EmptyState>
              ) : (
                filtered
                  .slice()
                  .reverse()
                  .map((item, index) => <ImageCard key={index} item={item} />)
              )}
            </CardWrapper>
          </>
        )}
      </GridWrapper>
    </Container>
  );
};

export default Home;
