import { useState } from "react";
import styled from "styled-components";
import TitleContentArea from "../../components/common/TitleContentArea.tsx";
import SelectableChipGroup from "../../components/roommate/checklist/SelectableChipGroup.tsx";
import ToggleGroup from "../../components/roommate/checklist/ToggleGroup.tsx";
import Header from "../../components/common/Header.tsx";
import SquareButton from "../../components/common/SquareButton.tsx";
import { createRoommatePost } from "../../apis/roommate.ts";
import {
  bedtime,
  colleges,
  days,
  domitory,
  isLightSleeper,
  mbti1,
  mbti2,
  mbti3,
  mbti4,
  organizationLevel,
  showerDuration,
  showertime,
  smoking,
  snoring,
  toothgrinding,
} from "../../constants/constants.ts";

export default function RoomMateChecklistPage() {
  // 각 그룹별로 선택 인덱스를 useState로 관리
  const [dayIndices, setDayIndices] = useState<number[]>([]);
  const [domitoryIndex, setDomitoryIndex] = useState<number | null>(null);
  const [collegeIndex, setCollegeIndex] = useState<number | null>(null);
  const [mbtiIndex1, setMbtiIndex1] = useState<number | null>(null);
  const [mbtiIndex2, setMbtiIndex2] = useState<number | null>(null);
  const [mbtiIndex3, setMbtiIndex3] = useState<number | null>(null);
  const [mbtiIndex4, setMbtiIndex4] = useState<number | null>(null);
  const [smokingIndex, setSmokingIndex] = useState<number | null>(null);
  const [snoringIndex, setSnoringIndex] = useState<number | null>(null);
  const [toothgrindingIndex, setToothgrindingIndex] = useState<number | null>(
    null,
  );
  const [isLightSleeperIndex, setIsLightSleeperIndex] = useState<number | null>(
    null,
  );
  const [showertimeIndex, setShowertimeIndex] = useState<number | null>(null);
  const [showerDurationIndex, setShowerDurationIndex] = useState<number | null>(
    null,
  );
  const [bedtimeIndex, setBedtimeIndex] = useState<number | null>(null);
  const [organizationLevelIndex, setOrganizationLevelIndex] = useState<
    number | null
  >(null);

  const handleSubmit = async () => {
    if (
      dayIndices.length === 0 || // ✅ 다중 선택 검사
      domitoryIndex === null ||
      collegeIndex === null ||
      mbtiIndex1 === null ||
      mbtiIndex2 === null ||
      mbtiIndex3 === null ||
      mbtiIndex4 === null ||
      smokingIndex === null ||
      snoringIndex === null ||
      toothgrindingIndex === null ||
      isLightSleeperIndex === null ||
      showertimeIndex === null ||
      showerDurationIndex === null ||
      bedtimeIndex === null ||
      organizationLevelIndex === null
    ) {
      alert("모든 항목을 선택해주세요.");
      return;
    }

    const mbti =
      mbti1[mbtiIndex1] +
      mbti2[mbtiIndex2] +
      mbti3[mbtiIndex3] +
      mbti4[mbtiIndex4];

    const requestBody = {
      title: "룸메이트 구해요!", // 임시 제목
      dormPeriod: dayIndices.map((i) => days[i] + "요일"), // ✅ 다중 선택 처리
      dormType: domitory[domitoryIndex],
      college: colleges[collegeIndex] + "학",
      mbti,
      smoking: smoking[smokingIndex],
      snoring: snoring[snoringIndex],
      toothGrind: toothgrinding[toothgrindingIndex],
      sleeper: isLightSleeper[isLightSleeperIndex],
      showerHour: showertime[showertimeIndex],
      showerTime: showerDuration[showerDurationIndex],
      bedTime: bedtime[bedtimeIndex],
      arrangement: organizationLevel[organizationLevelIndex],
      comment: "저랑 같이 룸메 해주세요.", // 필요시 텍스트 입력 추가
    };

    try {
      const res = await createRoommatePost(requestBody);
      alert("룸메이트 체크리스트 등록 완료!");
      console.log(res.data);
    } catch (err) {
      alert("등록 실패");
      console.error(err);
    }
  };

  return (
    <RoomMateChecklistPageWrapper>
      <Header title={"사전 체크리스트"} hasBack={true} showAlarm={false} />
      <TitleContentArea
        type={"기숙사 상주기간"}
        children={
          <SelectableChipGroup
            Groups={days}
            selectedIndices={dayIndices}
            onSelect={setDayIndices}
            multi={true}
          />
        }
      />
      <TitleContentArea
        type={"기숙사 종류"}
        children={
          <ToggleGroup
            Groups={domitory}
            selectedIndex={domitoryIndex}
            onSelect={setDomitoryIndex}
          />
        }
      />
      <TitleContentArea
        type={"단과대"}
        children={
          <SelectableChipGroup
            Groups={colleges}
            selectedIndex={collegeIndex}
            onSelect={setCollegeIndex}
          />
        }
      />
      <TitleContentArea
        type={"MBTI"}
        children={
          <>
            <ToggleGroup
              Groups={mbti1}
              selectedIndex={mbtiIndex1}
              onSelect={setMbtiIndex1}
            />
            <ToggleGroup
              Groups={mbti2}
              selectedIndex={mbtiIndex2}
              onSelect={setMbtiIndex2}
            />
            <ToggleGroup
              Groups={mbti3}
              selectedIndex={mbtiIndex3}
              onSelect={setMbtiIndex3}
            />
            <ToggleGroup
              Groups={mbti4}
              selectedIndex={mbtiIndex4}
              onSelect={setMbtiIndex4}
            />
          </>
        }
      />
      <TitleContentArea
        type={"흡연 여부"}
        children={
          <ToggleGroup
            Groups={smoking}
            selectedIndex={smokingIndex}
            onSelect={setSmokingIndex}
          />
        }
      />
      <TitleContentArea
        type={"코골이 여부"}
        children={
          <ToggleGroup
            Groups={snoring}
            selectedIndex={snoringIndex}
            onSelect={setSnoringIndex}
          />
        }
      />
      <TitleContentArea
        type={"이갈이 여부"}
        children={
          <ToggleGroup
            Groups={toothgrinding}
            selectedIndex={toothgrindingIndex}
            onSelect={setToothgrindingIndex}
          />
        }
      />
      <TitleContentArea
        type={"잠귀"}
        children={
          <ToggleGroup
            Groups={isLightSleeper}
            selectedIndex={isLightSleeperIndex}
            onSelect={setIsLightSleeperIndex}
          />
        }
      />
      <TitleContentArea
        type={"샤워 시기"}
        children={
          <ToggleGroup
            Groups={showertime}
            selectedIndex={showertimeIndex}
            onSelect={setShowertimeIndex}
          />
        }
      />
      <TitleContentArea
        type={"샤워 시간"}
        children={
          <ToggleGroup
            Groups={showerDuration}
            selectedIndex={showerDurationIndex}
            onSelect={setShowerDurationIndex}
          />
        }
      />
      <TitleContentArea
        type={"취침 시기"}
        children={
          <ToggleGroup
            Groups={bedtime}
            selectedIndex={bedtimeIndex}
            onSelect={setBedtimeIndex}
          />
        }
      />
      <TitleContentArea
        type={"정리 정돈"}
        children={
          <ToggleGroup
            Groups={organizationLevel}
            selectedIndex={organizationLevelIndex}
            onSelect={setOrganizationLevelIndex}
          />
        }
      />
      <ButtonWrapper>
        <SquareButton text={"저장하기"} onClick={handleSubmit} />
      </ButtonWrapper>
    </RoomMateChecklistPageWrapper>
  );
}

const RoomMateChecklistPageWrapper = styled.div`
  padding: 90px 20px;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #fafafa;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px;
  box-sizing: border-box;
  background: rgba(244, 244, 244, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;
