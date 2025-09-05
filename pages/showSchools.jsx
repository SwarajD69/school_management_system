import { useEffect, useState, useRef } from 'react';
import styles from '../styles/ShowSchools.module.css';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [searchName, setSearchName] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterState, setFilterState] = useState('');

  const intervalsRef = useRef({});

  useEffect(() => {
    fetch('/api/schools')
      .then(res => res.json())
      .then(data => {
        setSchools(data);
        setFilteredSchools(data);
      });
  }, []);

  useEffect(() => {
    Object.values(intervalsRef.current).forEach(clearInterval);
    intervalsRef.current = {};

    schools.forEach((school) => {
      if (school.image && school.image.length > 1) {
        intervalsRef.current[school.id] = setInterval(() => {
          setCurrentImageIndex(prev => {
            const current = prev[school.id] || 0;
            return {
              ...prev,
              [school.id]: (current + 1) % school.image.length,
            };
          });
        }, 3000);
      }
    });

    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
      intervalsRef.current = {};
    };
  }, [schools]);

  useEffect(() => {
    let filtered = schools;

    if (searchName.trim()) {
      const lowerSearch = searchName.toLowerCase();
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(lowerSearch)
      );
    }

    if (filterCity) {
      filtered = filtered.filter(school => school.city === filterCity);
    }

    if (filterState) {
      filtered = filtered.filter(school => school.state === filterState);
    }

    setFilteredSchools(filtered);
  }, [searchName, filterCity, filterState, schools]);

  // Calculate counts for badges based on filtered results
  const cityFilteredCount = filterCity
    ? filteredSchools.filter(s => s.city === filterCity).length
    : filteredSchools.length;

  const stateFilteredCount = filterState
    ? filteredSchools.filter(s => s.state === filterState).length
    : filteredSchools.length;

  // For dropdown options counts from full data
  const cityCounts = schools.reduce((acc, school) => {
    acc[school.city] = (acc[school.city] || 0) + 1;
    return acc;
  }, {});

  const stateCounts = schools.reduce((acc, school) => {
    acc[school.state] = (acc[school.state] || 0) + 1;
    return acc;
  }, {});

  const handlePrev = (schoolId, imagesLength) => {
    setCurrentImageIndex(prev => {
      const current = prev[schoolId] || 0;
      return {
        ...prev,
        [schoolId]: (current - 1 + imagesLength) % imagesLength,
      };
    });
    resetInterval(schoolId, imagesLength);
  };

  const handleNext = (schoolId, imagesLength) => {
    setCurrentImageIndex(prev => {
      const current = prev[schoolId] || 0;
      return {
        ...prev,
        [schoolId]: (current + 1) % imagesLength,
      };
    });
    resetInterval(schoolId, imagesLength);
  };

  const resetInterval = (schoolId, imagesLength) => {
    if (intervalsRef.current[schoolId]) {
      clearInterval(intervalsRef.current[schoolId]);
    }
    intervalsRef.current[schoolId] = setInterval(() => {
      setCurrentImageIndex(prev => {
        const current = prev[schoolId] || 0;
        return {
          ...prev,
          [schoolId]: (current + 1) % imagesLength,
        };
      });
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>School Listings</h2>

      {/* Filters Section */}
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by school name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className={styles.filterInput}
          aria-label="Search by school name"
        />

        <div className={styles.selectWrapper}>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className={styles.filterSelect}
            aria-label="Filter by city"
          >
            <option value="">Filter by City (All)</option>
            {Object.entries(cityCounts).map(([city, count]) => (
              <option key={city} value={city}>
                {city} ({count})
              </option>
            ))}
          </select>
          {filterCity && (
            <span className={styles.filterBadge}>{cityFilteredCount}</span>
          )}
        </div>

        <div className={styles.selectWrapper}>
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className={styles.filterSelect}
            aria-label="Filter by state"
          >
            <option value="">Filter by State (All)</option>
            {Object.entries(stateCounts).map(([state, count]) => (
              <option key={state} value={state}>
                {state} ({count})
              </option>
            ))}
          </select>
          {filterState && (
            <span className={styles.filterBadge}>{stateFilteredCount}</span>
          )}
        </div>

        {(searchName || filterCity || filterState) && (
          <button
            onClick={() => {
              setSearchName('');
              setFilterCity('');
              setFilterState('');
            }}
            className={styles.resetButton}
            aria-label="Reset filters"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Schools Grid */}
      <div className={styles.grid}>
        {filteredSchools.length === 0 ? (
          <p className={styles.noResults}>No schools found.</p>
        ) : (
          filteredSchools.map((school) => {
            const images = school.image || [];
            const currentIndex = currentImageIndex[school.id] || 0;
            const currentImage = images.length > 0 ? images[currentIndex] : null;

            return (
              <div key={school.id} className={styles.card}>
                {currentImage ? (
                  <>
                    <img
                      src={`/schoolImages/${currentImage}`}
                      alt={`${school.name} image ${currentIndex + 1}`}
                      className={styles.cardImage}
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          className={`${styles.navButton} ${styles.prevButton}`}
                          onClick={() => handlePrev(school.id, images.length)}
                          aria-label="Previous Image"
                        >
                          ◀
                        </button>
                        <button
                          className={`${styles.navButton} ${styles.nextButton}`}
                          onClick={() => handleNext(school.id, images.length)}
                          aria-label="Next Image"
                        >
                          ▶
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div
                    className={styles.cardImage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#eee',
                      color: '#666',
                    }}
                  >
                    No Image
                  </div>
                )}

                <h3 className={styles.cardTitle}>{school.name}</h3>
                <p className={styles.cardText}>{school.address}</p>
                <p className={styles.cardText}>
                  {school.city}, {school.state}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
