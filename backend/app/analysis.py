import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
import shutil
import os 

CHARTS_DIR = Path(__file__).resolve().parent.parent / "generated_charts"

def init_analysis():
    """
    Creates the charts directory if it doesn't exist.
    If it does exist, TRIES to clear its contents.
    """
    CHARTS_DIR.mkdir(exist_ok=True) 
    
    try:
        print(f"Clearing old charts from {CHARTS_DIR}...")
        for filename in os.listdir(CHARTS_DIR):
            file_path = CHARTS_DIR / filename
            if file_path.is_file() or file_path.is_link():
                file_path.unlink()
            elif file_path.is_dir():
                shutil.rmtree(file_path)
    except Exception as e:
        print(f"WARNING: Could not clear all charts from directory: {e}")


def get_data_summary(df: pd.DataFrame) -> dict:
    """
    Generates a high-level summary of the DataFrame.
    """
    try:
        data_types = df.dtypes.apply(lambda x: x.name).to_dict()
        
        description = df.describe().to_dict()
        
        missing_values = df.isnull().sum()
        missing_values = missing_values[missing_values > 0].to_dict()
        if not missing_values:
            missing_values = {"status": "No missing values found."}
            
        return {
            "columns": data_types,
            "description": description,
            "missing_values": missing_values
        }
    except Exception as e:
        print(f"Error in get_data_summary: {e}")
        return {}


def generate_charts(df: pd.DataFrame) -> list:
    """
    Generates charts for numeric and categorical columns and saves them.
    Returns a list of URLs to access the charts.
    """
    chart_urls = []
    sns.set_theme(style="whitegrid")
    
    for col in df.columns:
        plt.figure(figsize=(8, 5))
        
        try:
            if pd.api.types.is_numeric_dtype(df[col]):
                sns.histplot(df[col], kde=True)
                plt.title(f"Distribution of {col}")
                
            elif pd.api.types.is_object_dtype(df[col]) or pd.api.types.is_categorical_dtype(df[col]):
                if df[col].nunique() < 25:
                    sns.countplot(y=df[col], order=df[col].value_counts().index)
                    plt.title(f"Count of {col}")
                else:
                    plt.close()
                    continue
            else:
                plt.close()
                continue
                
            filename = f"chart_{col.replace(' ', '_')}.png"
            save_path = CHARTS_DIR / filename
            plt.savefig(save_path, bbox_inches='tight')
            plt.close()
            
            chart_urls.append(f"/charts/{filename}")
            
        except Exception as e:
            print(f"Error generating chart for {col}: {e}")
            plt.close()
            
    return chart_urls