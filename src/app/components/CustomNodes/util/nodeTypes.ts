import Data from '../Data';
import LinearRegression from '../LinearRegression';
import LogisticRegression from '../LogisticRegression';
import TrainModel from '../TrainModel';
import ScoreModel from '../ScoreModel';
import EvaluateModel from '../EvaluateModel';
import SplitData from '../SplitData';

const NodeTypes = {
  data: Data,
  splitData: SplitData,
  linearRegression: LinearRegression,
  logisticRegression: LogisticRegression,
  trainModel: TrainModel,
  scoreModel: ScoreModel,
  evaluateModel: EvaluateModel,
};

export default NodeTypes;
